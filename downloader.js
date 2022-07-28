import { default as axios } from 'axios';
import { SingleBar } from 'cli-progress';
import { createWriteStream, createReadStream, existsSync } from 'fs';
import { join, dirname } from 'node:path';
import colors from 'ansi-colors';
import { promisify } from 'util';
import { fileURLToPath } from 'url'
import { mkdir, unlink } from 'fs/promises';
import unzipper from 'unzipper'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BSMapFolder = 'Local_Path_To_CustomLevel'

const args = process.argv;
const input = args[2].split('/');
const id = input[2];

const getDownlaodURL = async (id) => {
    const resp = await axios.get(`https://api.beatsaver.com/maps/id/${id}`)
    const songData = resp.data
    const downloadURL = songData.versions[0].downloadURL;
    return {
        downloadURL: downloadURL,
        mapName: songData.id + ' - ' + songData.name
    }
};

const downloadMap = async () => {
    const map = await getDownlaodURL(id)
    const goodMapName = map.mapName.replace(/[:/*?"|\\]/g, '')
    console.log(colors.cyan.bold(`Starting download of ${goodMapName}`))

    const { data, headers } = await axios({
        url: map.downloadURL,
        method: 'GET',
        responseType: 'stream'
    });


    const bar = new SingleBar({
        format: `${colors.bold(goodMapName)} | ${colors.cyan('{bar}')}| {percentage}% |`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });


    const contentLength = parseInt(headers['content-length']);

    bar.start(contentLength, 0)

    const tempPath = `${join(__dirname, goodMapName)}.zip`
    const actualPath = `${BSMapFolder}\\${goodMapName}`


    data.on('data', async (chunk) => {
        bar.increment(chunk.length)
        if(bar.getProgress() == 1) {
            if (!existsSync(actualPath)){
                await mkdir(actualPath)
            }
            createReadStream(tempPath)
                .pipe(unzipper.Extract({ path: actualPath }));
            await promisify(setTimeout)(200)
            await unlink(tempPath)
            console.log(colors.bgMagenta.white.bold('\tFinished!'))
            await promisify(setTimeout)(3000)
            process.exit(0)
        }
    })
    data.pipe(createWriteStream(tempPath))
}

downloadMap();

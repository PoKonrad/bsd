## BeatSaver One-Click Downlaoder
A simple script made to utilize the One-Click Download function of bsaber.com.

## Usage
Export the project into a clean directory and run `npm install`. Open the `register` directory, run `npm install`.\
\
In the `register` directory run `node setup.js`. \
\
Go back to the main directory, edit `downloader.js`. Change `BSMapFolder` by replacing `Local_Path_To_CustomLevel` with a path to your Beat Saber CustomLevels directory.
```
const BSMapFolder = 'C:\Program Files (x86)\Steam\SteamApps\common\Beat Saber\Beat Saber_Data\CustomLevels'
```
After the process do not change the location of the script.\
\
The application runs automatically each time a One-Click install button is pressed on bsaber.com

![image](https://user-images.githubusercontent.com/110181064/181577840-0a335dc8-f946-4ffc-8bb7-6c9f6ec61f4f.png)


import Schedule from './schedule/Schedule.js'
import { audioPaths, pushButtonEvent, functionalButtonsSet } from './initializingAudio.js'

export let schedule = new Schedule(audioPaths);

export const handleTap = (audioName, callback) => {
    return function() {
        schedule.player.handleTap(audioName, callback && callback.bind(this));
    }
};

// set onclick for sound buttons
const buttonNode0 = document.getElementById('play_button0');
buttonNode0.onclick = handleTap('0audio');
const buttonNode1 = document.getElementById('play_button1');
buttonNode1.onclick = handleTap('1audio');
const buttonNode2 = document.getElementById('play_button2');
buttonNode2.onclick = handleTap('2audio');
const buttonNode3 = document.getElementById('play_button3');
buttonNode3.onclick = handleTap('3audio');
const buttonNode4 = document.getElementById('play_button4');
buttonNode4.onclick = handleTap('4audio');
const buttonNode5 = document.getElementById('play_button5');
buttonNode5.onclick = handleTap('5audio');
const buttonNode6 = document.getElementById('play_button6');
buttonNode6.onclick = handleTap('6audio');
const buttonNode7 = document.getElementById('play_button7');
buttonNode7.onclick = handleTap('7audio');
const buttonNode8 = document.getElementById('play_button8');
buttonNode8.onclick = handleTap('8audio');
const buttonNode9 = document.getElementById('play_button9');
buttonNode9.onclick = handleTap('9audio');

// set onclick for functional buttons
const buttonNodeAsterisk = document.getElementById('*');
buttonNodeAsterisk.onclick = () =>
    schedule.replayLoopSchedule();
const buttonNodeSlash = document.getElementById('/');
buttonNodeSlash.onclick = () =>
    schedule.clear();
const buttonNodeEnter = document.getElementById('Enter');
buttonNodeEnter.onclick = () =>
    schedule.switchPlayerState();

const buttonNodePlus = document.getElementById('+');
buttonNodePlus.onclick = () =>
    schedule.saveSequence();

const buttonNodeMinus = document.getElementById('-');
buttonNodeMinus.onclick = () =>
    schedule.switchRemoveState();

const buttonNodeReplay = document.getElementById('.');
buttonNodeReplay.onclick = () =>
    schedule.replaySchedule();

// Container with button's data
const buttons = [];

/**
 * Create array element with data of tapped button
 * @param {string} track Button's id
 * @param {Array} keys Key codes of tapped button in different OS
 */
const createAudioButton = (track, keys) => {
    let isUp = false;
    buttons.push({
        track: track,
        keys: keys,
        get isUp() {
            return isUp;
        },
        set isUp(value) {
            // Prevent repeat because of auto-repeat
            if (isUp !== value) {
                isUp = value;

                const btn = document.getElementById(track);
                if (!btn) {
                    return;
                }

                // Run playing
                pushButtonEvent.detail.isUp = isUp;
                pushButtonEvent.detail.buttonObject = btn;

                document.dispatchEvent(pushButtonEvent);
            }
        }
    });
};

/**
 * Find data of tapped button in array of buttons
 * @param {number} keyCode Button's code
 */
const findAudioButton = keyCode => {
    return buttons.find(item => item.keys.indexOf(keyCode) !== -1);
};

/**
 * Initialize handling of tap button
 * @param {boolean} isUp Pressed/keydown
 * @param {object} event Tap pad event
 */
const buttonListener = (isUp, event) => {
    const audioButton = findAudioButton(event.keyCode);

    if (audioButton) {
        event.preventDefault();
        audioButton.isUp = isUp;

        // Functional buttons handling
    } else {
        const buttonData = functionalButtonsSet.get(event.key);
        if (buttonData && buttonData.buttonObject) {
            const button = buttonData.buttonObject;
            if (event.type === 'keydown') {
                button.click();
            }
            button && button.classList.toggle('functional-button_active', event.detail.isUp);
        }
    }
};

document.addEventListener('keydown', buttonListener.bind(null, true));
document.addEventListener('keyup', buttonListener.bind(null, false));

createAudioButton('play_button0', [96, 48]);

createAudioButton('play_button1', [97, 49]);
createAudioButton('play_button2', [98, 50]);
createAudioButton('play_button3', [99, 51]);

createAudioButton('play_button4', [100, 52]);
createAudioButton('play_button5', [101, 53]);
createAudioButton('play_button6', [102, 54]);

createAudioButton('play_button7', [103, 55]);
createAudioButton('play_button8', [104, 56]);
createAudioButton('play_button9', [105, 57]);
// Audio paths are intentionally empty. Add a path to an audio file for an event
// in Year.js, for example: audio: "audio/marathon.mp3".
Object.values(eventsData).flat().forEach((event) => {
    event.audio = event.audio || '';
});

let eventAudioTimer = null;
let activeEventAudio = null;

function stopEventAudio() {
    if (eventAudioTimer !== null) {
        clearTimeout(eventAudioTimer);
        eventAudioTimer = null;
    }

    if (activeEventAudio) {
        activeEventAudio.pause();
        activeEventAudio.currentTime = 0;
        activeEventAudio = null;
    }
}

const originalShowEventDetails = showEventDetails;
showEventDetails = function (event) {
    stopEventAudio();
    originalShowEventDetails(event);

    if (!event || !event.audio) return;

    activeEventAudio = new Audio(event.audio);
    activeEventAudio.play().catch((error) => {
        console.warn('Не удалось воспроизвести аудио события:', error);
    });

    eventAudioTimer = setTimeout(stopEventAudio, 10000);
};

const originalCloseModal = closeModal;
closeModal = function () {
    stopEventAudio();
    originalCloseModal();
};

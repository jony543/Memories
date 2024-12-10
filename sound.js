const sounds = ['arpeggio.mp3', 'oud.mp3'];
const players = [];
const reverses = [];

const delay = 1.1;

const setupSounds = async () => {
    await Tone.start();

    const ch1 = new Tone.Panner(1).toDestination();
    const ch2 = new Tone.Panner(-1).toDestination();

    for (url of sounds) {
        const props = {
            autostart: false,
            url,
            fadeIn: 0.1,
            fadeOut: 0.1,
            onload: () => console.log(url + ' loaded'),
            onerror: (err) => console.log(url + ' error', err),
        }
        
        const player = new Tone.Player(props).connect(ch1);
        players.push(player);
    
        const reversed = new Tone.Player(Object.assign(props, {reverse: true})).connect(ch2);
        reverses.push(reversed);
    }

    document.onkeydown = ev => {
        const soundId = ev.key - '0' - 1;
        const p = players[soundId]
        const r = reverses[soundId]
    
        p.start();
        r.start(`+${delay}`);

        ch1.pan.rampTo(ch1.pan.value * -1, r.buffer.duration, `+${delay}`)
        ch2.pan.rampTo(ch2.pan.value * -1, r.buffer.duration, `+${delay}`)
    };
}
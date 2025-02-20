
const EventEmitter = require('events');

class FileManager extends EventEmitter {
    constructor () {
        super();
    }

    async readFile(fileName) {
        const fs = require('fs').promises; // Utilise la version Promises de fs

        try {
            const data = await fs.readFile(fileName, 'utf8');
            this.emit('read', data);
        } catch (err) {
            this.emit('error', err);
        }

    }

    async writeFile(fileName) {const fs = require('fs').promises; // Utilise la version Promises de fs

        try {
            await fs.writeFile(fileName, content, 'utf8');
            this.emit('write', `Fichier "${fileName}" écrit avec succès.`);
        } catch (err) {
            this.emit('error', err);
        }
    }
}
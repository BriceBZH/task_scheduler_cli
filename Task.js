const FileManager = require('fileManager.js');
class Task {
    constructor(id, name, delay, funct, repeat = false) {
        this.id = id;
        this.name = name;
        this.delay = delay;
        this.funct = funct;  // La fonction peut être synchrone ou asynchrone
        this.repeat = repeat;

        this.fileManager = new FileManager();
    }

    

    async run() {
        console.log(`La tâche "${this.name}" sera exécutée après ${this.delay} ms`);

        // Vérifier si la tâche est liée à un fichier (par exemple, lire ou écrire un fichier)
        if (this.name === "Lire un fichier") {
            // Écouter les événements de lecture
            this.fileManager.on('read', (data) => {
                console.log('Fichier lu avec succès:', data);
            });
            this.fileManager.on('error', (err) => {
                console.error('Erreur lors de la lecture du fichier:', err);
            });

            try {
                await this.fileManager.readFile('chemin/vers/ton/fichier.txt'); // Change le chemin
            } catch (error) {
                console.error('Erreur lors de l\'exécution de la tâche de lecture:', error);
            }
        } else if (this.name === "Écrire dans un fichier") {
            // Écouter les événements d'écriture
            this.fileManager.on('write', (data) => {
                console.log('Fichier écrit avec succès:', data);
            });
            this.fileManager.on('error', (err) => {
                console.error('Erreur lors de l\'écriture du fichier:', err);
            });

            try {
                await this.fileManager.writeFile('chemin/vers/ton/fichier.txt'); // Change le chemin
            } catch (error) {
                console.error('Erreur lors de l\'exécution de la tâche d\'écriture:', error);
            }
        } else {
            // Si la tâche n'est pas liée à un fichier, on exécute la fonction classique
            if (this.repeat) {
                setInterval(async () => {
                    console.log(`Exécution répétée de : ${this.name}`);
                    try {
                        const result = await this.funct();
                        console.log(`Résultat de la tâche : ${result}`);
                    } catch (error) {
                        console.error(`Erreur dans la tâche ${this.name}:`, error);
                    }
                }, this.delay);
            } else {
                setTimeout(async () => {
                    console.log(`Exécution de : ${this.name}`);
                    try {
                        const result = await this.funct();
                        console.log(`Résultat de la tâche : ${result}`);
                    } catch (error) {
                        console.error(`Erreur dans la tâche ${this.name}:`, error);
                    }
                }, this.delay);
            }
        }
    }
}
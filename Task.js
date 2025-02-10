class Task {
    constructor(id, name, delay, funct, repeat = false) {
        this.id = id;
        this.name = name;
        this.delay = delay;
        this.funct = funct;  // La fonction peut être synchrone ou asynchrone
        this.repeat = repeat;
    }

    async run() {
        console.log(`La tâche "${this.name}" sera exécutée après ${this.delay} ms`);

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
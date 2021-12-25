$(document).ready(() => {

    let name = 'Thomas Ricardo Reinke';

    let splitName;
    let strangeChars = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת','?','.','?','?'];
    let promisesArray = [];

    setInterval(() => {

        splitName = name.split('');

        // for each letter
        for (let index = 0; index < splitName.length; index++) {

            if (splitName[index] == ' ') {
                continue;

            } else {

                // 20% chance to glitch that letter
                if (Math.random() > 0.8) {

                    promisesArray.push(randomizeChar(index, splitName[index]).then((response) => {
                        splitName[response['position']] = response['original'];
                    }));

                }
            }
        }

        Promise.all(promisesArray).then(() => {
            $('#glitch').html(setClasses(name));
        });

    }, 5000);

    $('#glitch').html(setClasses(name));

    async function randomizeChar(position, originalChar) {

        // random delay
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (2000))));

        return new Promise((resolve) => {

            let count = 0;
            let limit = Math.floor(Math.random() * (100)) + 10;
            let interval = setInterval(() => {
    
                if (count >= limit) {
                    resolve({'position': position, 'original': originalChar});
                    clearInterval(interval)
                }

                let newChar = strangeChars[strangeChars.length * Math.random() | 0];
                splitName[position] = newChar;

                $('#glitch').html(setClasses(splitName.join('')));
                count++;
        
            }, 10);
        });
    }

    // set even space between letters
    function setClasses(name) {

        nameList = name.split('');

        for (let i = 0; i < nameList.length; i++) {
            nameList[i] = '<span class="letter">' + nameList[i] + '</span>';
        }

        return nameList.join('');
    }

});
import * as fs from 'fs'

function parse(content) {
    content = content.substr(4);
    let itemName = '';
    let index = 0;
    for (let i = 0; i < content.length; i++) {
        if (content[i] == ' ' || content[i] == '\n') {
            continue;
        }

        if(content[i] == "(") {
            index = i + 1;
            break;
        }

        itemName+=content[i];
    }

    for (let i = index; i < content.length; i++) {
        if (content[i] == '.') {
            index = i + 1;
            break;
        }
    }
    let itemGroup = '';
    for (let i = index; i < content.length; i++) {
        if (content[i] == ' ' || content[i] == '\n') {
            continue;
        }

        if(content[i] == ",") {
            index = i + 1;
            break;
        }

        itemGroup+=content[i];
    }

    for (let i = index; i < content.length; i++) {
        if (content[i] == ',') {
            index = i + 1;
            break;
        }
    }

    for (let i = index; i < content.length; i++) {
        if (content[i] == '.') {
            index = i + 1;
            break;
        }
    }

    let RecipeType = '';
    for (let i = index; i < content.length; i++) {
        if (content[i] == ' ' || content[i] == '\n')  {
            continue;
        }

        if(content[i] == ",") {
            index = i + 1;
            break;
        }

        RecipeType+=content[i];
    }

    for (let i = index; i < content.length; i++) {
        if(content[i]+content[i+1]+content[i+2] == "new") {
            index = i + 1;
            break;
        }
    }

    for (let i = index; i < content.length; i++) {
        if(content[i] == "{") {
            index = i + 1;
            break;
        }
    }
    let recipie = [];
    for (let j = 0; j < 9; j++) {
        recipie[j] = '';
        let skip = false;
        for (let i = index; i < content.length; i++) {
            if (content[i] + content[i+1] + content[i+2] + content[i+3] == 'null') {
                index = i + 5;
                recipie[j] = null;
                skip = true;
                break;
            }

            if (content[i] == '.') {
                index = i + 1;
                break;
            }
        }

        for (let i = index; i < content.length; i++) {
            if (skip) {
                break;
            }
            if (content[i] == ' ' || content[i] == '\n')  {
                continue;
            }
    
            if(content[i] == ",") {
                index = i + 1;
                break;
            }
    
            recipie[j]+=content[i];
        }
    }

    return recipie;
}

var content = fs.readFileSync('./tools/recipies.java','utf8');

console.log(parse(content));

import * as fs from 'fs'

function parse(content) {
    content = content.substr(4);
    let index = 0;
    for (let i = 0; i < content.length; i++) {
        if (content[i] == ' ' || content[i] == '\n') {
            continue;
        }

        if(content[i] == "(") {
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

    if (content.includes("Radioactivity")) {
        for (let i = index; i < content.length; i++) {
            if (content[i] == ',') {
                index = i + 1;
                break;
            }
        }
    }

    let itemName = '';

    for (let i = index; i < content.length; i++) {
        if (content[i] == '.') {
            index = i + 1;
            break;
        }
    }

    for (let i = index; i < content.length; i++) {
        if (content[i] == ' ' || content[i] == '\n') {
            continue;
        }

        if(content[i] == ",") {
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
    
            if(content[i] == "," || content[i] == "}" || content[i] == ")") {
                index = i + 1;
                break;
            }
    
            recipie[j]+=content[i];
        }
    }
    let itemStack = 1;

    if (content[index] != ')') {
        index++;

        for (let i = index; i < content.length; i++) {
            if(content[i] == "(") {
                index = i + 1;
                break;
            }
        }

        for (let i = index; i < content.length; i++) {
            if (content[i] == ',') {
                index = i + 1;
                break;
            }
        }
        let tmp = '';
        for (let i = index; i < content.length; i++) {
            if (content[i] == ' ' || content[i] == '\n') {
                continue;
            }
    
            if(content[i] == ")") {
                index = i + 1;
                break;
            }
    
            tmp+=content[i];
        }
        itemStack = Number(tmp);
    }

    let props = content.substr(index+1).replace(/\s/g, "");
    let capacity = -1;
    let energyConsumption = -1;
    let processingSpeed = -1;
    
    for (let i = 0; content.substr(i, i+8) != ".register(plugin);"; i++) {
        if (props[i] == '.') {
            i++;
            let tmp = '';
            let temp = '';
            for(let j = i; j < props.length; j++) {
                if(props[j] == "(") {
                    j++;
                    for(let k = j; k < props.length; k++) {
                        if(props[k] == ")") {
                            index = i + 1;
                            break;
                        }
                        temp+= props[k];
                    }
                    break;
                }

                if(props[j] == ")") {
                    break;
                }
                tmp+= props[j];
            }
            if (tmp == 'setCapacity') {
                capacity = Number(temp);
            }
            if (tmp == 'setEnergyConsumption') {
                energyConsumption = Number(temp);
            }
            if (tmp == 'setProcessingSpeed') {
                processingSpeed = Number(temp);
            }
        }
    }
    if (itemName.includes("_")) {
        itemName = itemName.split("_");
        for (let i = 0; i < itemName.length; i++) {
            itemName[i] = itemName[i].toLowerCase();
            itemName[i] = itemName[i].charAt(0).toUpperCase() + itemName[i].slice(1);
        }
        itemName = itemName.join(" ");
    } else {
        itemName = itemName.toLowerCase();
        itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
    }

    // itemGroup = itemGroup.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, "$1");
    // itemGroup = itemGroup.charAt(0).toUpperCase() + itemGroup.slice(1);

    let item = {
        itemName: itemName,
        itemGroup: itemGroup,
        RecipeType: RecipeType,
        recipie: recipie,
        capacity: capacity,
        energyConsumption: energyConsumption,
        processingSpeed: processingSpeed
    }

    return item;
}

function parseAll(content) {
    let toParse = content.replace(/(?<=;)\s+(?=new)/g, '!__!');
    toParse = toParse.split("!__!");
    let parsed = {};

    for (let i = 0; i < toParse.length; i++) {
        if (toParse[i].includes("ItemStack[]")) {
            let p = parse(toParse[i]);
            parsed[p.itemName] = p;
        }
    }
    
    return parsed;
}

function parseAllArray(content) {
    let toParse = content.replace(/(?<=;)\s+(?=new)/g, '!__!');
    toParse = toParse.split("!__!");
    let parsed = [];

    for (let i = 0; i < toParse.length; i++) {
        if (toParse[i].includes("ItemStack[]")) {
            let p = parse(toParse[i]);
        parsed.push(p);
        }
    }
    
    return parsed;
}
  
  
var content = fs.readFileSync('./tools/recipies.java','utf8');

let parsed = parseAll(content);
// Output: '        new MeatJerky(itemGroups.food,SlimefunItems.BEEF_JERKY,RecipeType.ENHANCED_CRAFTING_TABLE,new ItemStack[] {SlimefunItems.SALT,new ItemStack(Material.COOKED_BEEF),null,null,null,null,null,null,null}).register(plugin);'

fs.writeFileSync("./tools/parsed.json", JSON.stringify(parsed));

parsed = parseAllArray(content);
// Output: '        new MeatJerky(itemGroups.food,SlimefunItems.BEEF_JERKY,RecipeType.ENHANCED_CRAFTING_TABLE,new ItemStack[] {SlimefunItems.SALT,new ItemStack(Material.COOKED_BEEF),null,null,null,null,null,null,null}).register(plugin);'

fs.writeFileSync("./tools/parsedArray.json", JSON.stringify(parsed));


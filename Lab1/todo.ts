import * as readline from 'readline-sync';

const items : string[]= [];
let input: string;

do {
	input = String(readline.question('enter command: ')).trim()
	if (input.indexOf('add ') === 0) {
		const space: number = input.indexOf(' ')
		const item: string = input.substring(space).trim()

    //Check Duplicate
    for (let i=0; i< items.length; i++) {
			if (items.includes(item)){
        console.log('Duplicate Items')
      }
      else{
        console.log(`adding "${item}"`)
		    items.unshift(item)
      }
		}
	}
  if (input.indexOf('remove ') === 0) {
		const space: number = input.indexOf(' ')
		const item: string = input.substring(space).trim()
		console.log(`removing "${item}"`)
    for (let i=0; i< items.length; i++) {
			if (item == items[i]){
        items.splice(i)
      }
		}
	}
	if (input.indexOf('list') === 0) {
		for (let i=0; i< items.length; i++) {
			console.log(`${i}. ${items[i]}`)
		}
	}
} while (input !== 'exit')

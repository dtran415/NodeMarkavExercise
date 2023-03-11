const MarkovMachine = require("./markov")

describe('Markov Machine Tests', function() {
    test('chains map is correctly created', function() {
        const text = "the cat in the hat is in the hat";
        const mm = new MarkovMachine(text);
        mm.makeChains();
        expect(mm.chains).toEqual(new Map([
            ["the", ["cat", "hat", "hat"]],
            ["cat", ["in"]],
            ["in", ["the", "the"]],
            ["hat", ["is", null]],
            ["is", ["in"]]
        ]));
    });

    test('makeText creates at least num words', () => {
        const text = "the cat in the hat is in the hat";
        const mm = new MarkovMachine(text);
        mm.makeChains();
        const maxWords = 2;
        const result = mm.makeText(maxWords);
        const words = result.split(" ");
        expect(words.length).toBeLessThanOrEqual(maxWords);
    });

    test('makeText correctly creates sentences', () => {
        const text = "a b c";
        const mm = new MarkovMachine(text);
        mm.makeChains();
        const maxWords = 2;
        const result = mm.makeText(maxWords);
        // these are the 3 possible results with just 3 words
        expect(['a b', 'b c', 'c']).toContain(result);
    });
});
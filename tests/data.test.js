const fs = require('fs');
const path = require('path');

describe('Data Integrity Test Suite', () => {
    let electionData;

    beforeAll(() => {
        // Read the actual JS file as string
        const dataFilePath = path.join(__dirname, '../js/data.js');
        const dataFile = fs.readFileSync(dataFilePath, 'utf8');
        
        // Clean the ES6 export statement to evaluate it cleanly in Node context
        const cleanedData = dataFile.replace('export const electionData =', 'electionData =');
        eval(cleanedData);
    });

    test('electionData object should be defined', () => {
        expect(electionData).toBeDefined();
    });

    test('electionData.timeline should be a non-empty array', () => {
        expect(Array.isArray(electionData.timeline)).toBe(true);
        expect(electionData.timeline.length).toBeGreaterThan(0);
    });

    test('electionData.quiz should be an array of objects', () => {
        expect(Array.isArray(electionData.quiz)).toBe(true);
        expect(electionData.quiz.length).toBeGreaterThan(0);
        expect(electionData.quiz[0]).toHaveProperty('question');
    });

    test('electionData.global should be an array', () => {
        expect(Array.isArray(electionData.global)).toBe(true);
    });

    test('electionData.glossary should be an array', () => {
        expect(Array.isArray(electionData.glossary)).toBe(true);
    });
});

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Simple Unit Test Suite to verify data integrity
try {
    const dataFilePath = path.join(__dirname, '../data.js');
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    
    // Evaluate data.js in this context
    eval(dataFile);

    // Assertions
    assert.ok(electionData, "electionData object should be defined");
    assert.ok(Array.isArray(electionData.timeline), "electionData.timeline should be an array");
    assert.strictEqual(electionData.timeline.length > 0, true, "Timeline should not be empty");
    
    assert.ok(Array.isArray(electionData.quiz), "electionData.quiz should be an array");
    assert.ok(Array.isArray(electionData.global), "electionData.global should be an array");
    assert.ok(Array.isArray(electionData.glossary), "electionData.glossary should be an array");

    console.log("✅ All data integrity tests passed successfully!");
} catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
}

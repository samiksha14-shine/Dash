// index.jsx Line 46:20
const published = true;

// Line 48:24
const likelihood = 5;

// ... other parts of your code

// Line 71:37
const impact = 10;

// Line 73:21
const Impacts = [{id: 1, name: 'Impact 1'}, {id: 2, name: 'Impact 2'}];

// ... other parts of your code

// Line 76:35
const Relevance = [{id: 1, name: 'Relevance 1'}, {id: 2, name: 'Relevance 2'}];

// Line 73:52
const yearlyimpactsTotal = Impacts.reduce((total, impact) => total + impact.value, 0);
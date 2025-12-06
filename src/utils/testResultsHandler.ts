import * as fs from 'fs';
import * as path from 'path';

// Structure for storing individual test result details
interface TestResult {
  name: string;                   
  status: 'passed' | 'failed';     
  error?: string;                 
  timestamp: string;               
}

// Structure for storing summary of multiple test results
interface TestSuiteResults {
  totalTests: number;              
  passedTests: number;             
  failedTests: number;             
  results: TestResult[];           
  timestamp: string;               
}

export class TestResultsHandler {
  private resultsFilePath: string; // File location where results will be saved

  constructor(filePath: string = 'test-results/results.json') {
    this.resultsFilePath = filePath;
    
    // Ensure the directory exists, if not create it
    this.ensureDirectoryExists();
  }

  // Create folders automatically if they don't exist
  private ensureDirectoryExists(): void {
    const dir = path.dirname(this.resultsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // recursive:true creates nested folders
    }
  }

  // Add a new test result to the results.json file
  addTestResult(testName: string, status: 'passed' | 'failed', error?: string): void {
    const results = this.loadResults(); // Load existing results first
    
    const testResult: TestResult = {
      name: testName,
      status,
      error,
      timestamp: new Date().toISOString(), // Record current time
    };

    results.results.push(testResult);  // Add result to list

    // Update summary values
    results.totalTests = results.results.length;
    results.passedTests = results.results.filter(r => r.status === 'passed').length;
    results.failedTests = results.results.filter(r => r.status === 'failed').length;
    results.timestamp = new Date().toISOString(); // Update last modified timestamp

    this.saveResults(results); // Save updated final results to file
  }

  // Reads the results file data (if exists), otherwise returns empty result object
  private loadResults(): TestSuiteResults {
    if (fs.existsSync(this.resultsFilePath)) {
      try {
        const data = fs.readFileSync(this.resultsFilePath, 'utf-8'); // Read file content
        return JSON.parse(data); // Convert JSON  JS object
      } catch {
        return this.getEmptyResults(); // File corrupted?  reset to empty
      }
    }
    return this.getEmptyResults(); // If file does not exist return empty results
  }

  // Returns default blank structure (first time or file missing case)
  private getEmptyResults(): TestSuiteResults {
    return {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      results: [],
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  // Saves results into the JSON file
  private saveResults(results: TestSuiteResults): void {
    fs.writeFileSync(
      this.resultsFilePath,
      JSON.stringify(results, null, 2),  // Format JSON with indentation
      'utf-8'
    );
    console.log(`Test results saved to ${this.resultsFilePath}`);
  }

  // Public method to get all results anywhere in program
  getResults(): TestSuiteResults {
    return this.loadResults();
  }
}


import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  name: string;
  status: 'passed' | 'failed';
  error?: string;
  timestamp: string;
}

interface TestSuiteResults {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: TestResult[];
  timestamp: string;
}

export class TestResultsHandler {
  private resultsFilePath: string;

  constructor(filePath: string = 'test-results/results.json') {
    this.resultsFilePath = filePath;
    this.ensureDirectoryExists();
  }

  private ensureDirectoryExists(): void {
    const dir = path.dirname(this.resultsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  addTestResult(testName: string, status: 'passed' | 'failed', error?: string): void {
    const results = this.loadResults();
    
    const testResult: TestResult = {
      name: testName,
      status,
      error,
      timestamp: new Date().toISOString(),
    };

    results.results.push(testResult);
    results.totalTests = results.results.length;
    results.passedTests = results.results.filter(r => r.status === 'passed').length;
    results.failedTests = results.results.filter(r => r.status === 'failed').length;
    results.timestamp = new Date().toISOString();

    this.saveResults(results);
  }

  private loadResults(): TestSuiteResults {
    if (fs.existsSync(this.resultsFilePath)) {
      try {
        const data = fs.readFileSync(this.resultsFilePath, 'utf-8');
        return JSON.parse(data);
      } catch {
        return this.getEmptyResults();
      }
    }
    return this.getEmptyResults();
  }

  private getEmptyResults(): TestSuiteResults {
    return {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      results: [],
      timestamp: new Date().toISOString(),
    };
  }

  private saveResults(results: TestSuiteResults): void {
    fs.writeFileSync(
      this.resultsFilePath,
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    console.log(`Test results saved to ${this.resultsFilePath}`);
  }

  getResults(): TestSuiteResults {
    return this.loadResults();
  }
}

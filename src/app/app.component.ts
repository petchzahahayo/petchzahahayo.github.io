import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sgntest';
  year: number = 0;

  private chart: Chart = {} as Chart;
  private data: any[] = []; // Initialize with your data

  constructor(private http: HttpClient) {
    Chart.register(ChartDataLabels);
  }

  ngOnInit() {
    this.readExcelFile();
  }

  createChart(jsonData: any) {
    const ctx = document.getElementById('myChart');
    const data = [...jsonData];
    let startYear = 1950;
    const resultArrays = data.map((item) => item[startYear]);

    if (ctx) {
      let delayed: boolean;
      const chart = new Chart(ctx.id, {
        type: 'bar',
        options: {
          indexAxis: 'y',
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (
                context.type === 'data' &&
                context.mode === 'default' &&
                !delayed
              ) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
        data: {
          labels: this.data.map((item) => item.Countryname),
          datasets: [
            {
              data: this.data.map((item) => item[startYear]),
              backgroundColor: this.data.map((item) => item.color),
              datalabels: {
                align: 'end',
                anchor: 'end',
              },
            },
          ],
        },
        
      });

      setInterval(() => {
        startYear++;
  
        if (startYear > 2021) {
          startYear = 1950;
        }
        this.year = startYear;
  
        const test1 = this.data.map((item) => ({
          startYear: item[startYear],
          Countryname: item.Countryname,
          color: item.color,
        }));
        test1.sort((a, b) => b.startYear - a.startYear);
        const currentYearData = test1.map((item) => item.startYear);
        const currentname = test1.map((item) => item.Countryname);
        const currentcolor = test1.map((item) => item.color);
  
        chart.data.labels = currentname;
        chart.data.datasets[0].data = currentYearData;
        chart.data.datasets[0].backgroundColor = currentcolor;
        chart.data.datasets[0].label = `Year ${startYear}`;
  
  
        chart.update();
      }, 200);
    }
  }

  createChart2(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let delayed: boolean;
    let startYear = 1950;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.map((item) => item.Countryname),
        datasets: [
          {
            data: this.data.map((item) => item[startYear]),
            backgroundColor: this.data.map((item) => item.color),
            datalabels: {
              align: 'end',
              anchor: 'end',
            }, // Customize the bar color
          },
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === 'data' &&
              context.mode === 'default' &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        indexAxis: 'y',

        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: false,
          },
        },

        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            color: '#000000',
            opacity: 1,
          },
        },
      },
    });

    setInterval(() => {
      startYear++;

      if (startYear > 2021) {
        startYear = 1950;
      }
      this.year = startYear;
      // Get data for the current year
      // const currentYearData = this.data.map((item) => item[startYear]);

      // console.log(currentYearData);

      const test1 = this.data.map((item) => ({
        startYear: item[startYear],
        Countryname: item.Countryname,
        color: item.color,
      }));
      test1.sort((a, b) => b.startYear - a.startYear);
      const currentYearData = test1.map((item) => item.startYear);
      const currentname = test1.map((item) => item.Countryname);
      const currentcolor = test1.map((item) => item.color);

      // Update the chart's dataset and label
      this.chart.data.labels = currentname;
      this.chart.data.datasets[0].data = currentYearData;
      this.chart.data.datasets[0].backgroundColor = currentcolor;
      this.chart.data.datasets[0].label = `Year ${startYear}`;

      // this.chart.data.datasets[0].hidden = true;

      // Update the chart
      this.chart.update();
    }, 200);
  }

  private updateChartData(): void {
    // Implement logic to update the chart data (e.g., year-by-year data changes)
    // For example, update this.data and this.chart.data.datasets[0].data
    // Then, call this.chart.update() to animate the chart
  }

  updateChart(data: any[], year: number): void {
    const yearsToExtract = [
      1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961,
      1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973,
      1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985,
      1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
      1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
      2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    ];
    const ctx = document.getElementById('myChart');
    const resultArrays = data.map((item) => {
      const yearValue = item[year];
      // Increment the year for the next iteration
      return yearValue;
    });

    console.log('resultArrays>>>', resultArrays);
  }

  readExcelFile() {
    this.http
      .get('./assets/data.xlsx', { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(jsonData);
        this.data = jsonData;
        // this.createChart2();
        this.createChart(jsonData);
      });
  }

  getCSVFile() {
    return this.http.get(`http://localhost:3000/api/excel`); // Use the port where your Express server is running
  }
}

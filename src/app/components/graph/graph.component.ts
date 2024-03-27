import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Router,NavigationEnd} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CanvasJSAngularChartsModule,MatButtonModule, MatToolbarModule, MatFormFieldModule, MatIconModule,HttpClientModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent  {
  currentDate: string = ''; // กำหนดค่าเริ่มต้นเป็น string
  
  constructor(private router: Router) {}
  chartOptions = {
    title: {
        text: "ชื่อภาพนะเพื่อน"//ฮี๊ฮี
    },
    animationEnabled: true,
    axisX:{      
        interval: 10,
        intervalType: "day",
        valueFormatString: "D MMM",
        labelFontColor: "rgb(0,75,141)",
        minimum: new Date(2012, 6, 10)
    },
    axisY: {
        title: "",
        interlacedColor: "#EBF2FA",
        tickColor: "azure",
        titleFontColor: "#4f81bc",
        valueFormatString: "#M,,."
    },
    data: [{ 
        name: 'views',
        type: "area",
        markerSize: 8,
        dataPoints: [
            { x: new Date(2012, 6, 15), y: 0,  indexLabel: "Release", indexLabelFontColor: "orangered", markerColor: "orangered"},       
            { x: new Date(2012, 6, 18), y: 2000000 }, 
            { x: new Date(2012, 6, 23), y: 6000000 }, 
            { x: new Date(2012, 7, 1), y: 10000000, indexLabel:"10M"}, 
            { x: new Date(2012, 7, 11), y: 21000000 }, 
            { x: new Date(2012, 7, 23), y: 50000000 }, 
            { x: new Date(2012, 7, 31), y: 75000000  }, 
            { x: new Date(2012, 8, 4), y: 100000000, indexLabel:"100M" },
            { x: new Date(2012, 8, 10), y: 125000000 },
            { x: new Date(2012, 8, 13), y: 150000000},	
            { x: new Date(2012, 8, 16), y: 175000000},	
            { x: new Date(2012, 8, 18), y: 200000000, indexLabel:"200M"},	
            { x: new Date(2012, 8, 21), y: 225000000},	
            { x: new Date(2012, 8, 24), y: 250000000},	
            { x: new Date(2012, 8, 26), y: 275000000},	
            { x: new Date(2012, 8, 28), y: 302000000, indexLabel:"300M"}	
        ]
    }]
}
toProfile() {
  this.router.navigate(['/profile']);
}

logout() {
  this.router.navigate(['/']);
}


} 
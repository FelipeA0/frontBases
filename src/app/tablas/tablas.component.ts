import { DataService } from './../data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {
  pay: any[]
  asg: any[]
  proj: any[]
  emp: any[]

  db
  dbOption
  table
  bandPAY = false
  bandASG = false
  bandPROJ = false
  bandEMP = false
  bandDelete = false
  bandInsert = false
  bandUpdate = false
  titleold
  salold
  enold
  pnold
  respold
  durold
  pnameold
  budgetold
  enameold

  @ViewChild("title") title: ElementRef;
  @ViewChild("sal") sal: ElementRef;
  @ViewChild("eno") eno: ElementRef;
  @ViewChild("pno") pno: ElementRef;
  @ViewChild("resp") resp: ElementRef;
  @ViewChild("dur") dur: ElementRef;
  @ViewChild("pname") pname: ElementRef;
  @ViewChild("budget") budget: ElementRef;
  @ViewChild("ename") ename: ElementRef;

  dataDB:Array<Object> = [
    {id: 0, name: "Seleccione una base de datos"},
    {id: 1, name: "Linux"},
    {id: 2, name: "Windows"}
];

dataTable:Array<Object> = [
  {id: 0, name: "Seleccione una tabla"},
  {id: 1, name: "ASG"},
  {id: 2, name: "PROJ"},
  {id: 3, name: "EMP"},
  {id: 4, name: "PAY"}
];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  mostrarTabla()
  {
    this.bandDelete = false


    if(this.bandUpdate || this.bandInsert)
      this.cancelar(this.table.name)


    if(this.db.name=="Windows" || this.db.name == "Linux")
    {
      if(this.db.name=="Windows")
        this.dbOption = "1"
      else
      this.dbOption = "2"

      if(this.table.name=="PAY")
      {
        this.bandPROJ=false
        this.bandPAY=true
        this.bandASG=false
        this.bandEMP=false
        this.getPay(this.dbOption)
        console.log("Se muestra una pinche tabla")
        console.log("Tabla: "+this.table.name)

      }
      else
      {
        this.bandPAY = false
      }


      if(this.table.name=="ASG")
      {
        this.bandPROJ=false
        this.bandPAY=false
        this.bandASG=true
        this.bandEMP= false
        this.getAsg(this.dbOption)
      }
      else
      {
        this.bandASG=false
      }

      if(this.table.name=="PROJ")
      {
        this.bandPAY=false
        this.bandASG=false
        this.bandPROJ=true
        this.bandEMP = false
        this.getProj(this.dbOption)
      }
      else
      {
        this.bandPROJ=false
      }

      if(this.table.name=="EMP")
      {
        this.bandPAY=false
        this.bandASG=false
        this.bandPROJ=false
        this.bandEMP=true
        this.getEmp(this.dbOption)
      }
      else
      {
        this.bandEMP=false
      }

    }
    else
    {
      this.bandPAY = false
      this.bandASG = false
      this.bandPROJ=false
      this.bandEMP=false
    }
  }

  getPay(db: String)
  {
    this.dataService.getPay(db).subscribe((res:any) =>{
      this.pay = res;
      console.log(this.pay)
    })
  }

  getAsg(db: String)
  {
    this.dataService.getASG(db).subscribe((res:any) =>{
      this.asg = res;
      console.log(this.asg)
    })
  }

  getProj(db: String)
  {
    this.dataService.getProj(db).subscribe((res:any) =>{
      this.proj = res;
      console.log(this.proj)
    })
  }

  getEmp(db: String)
  {
    this.dataService.getEmp(db).subscribe((res:any) =>{
      this.emp = res;
      console.log(this.proj)
    })
  }

  getDB()
  {
    console.log(this.db.name)
  }

  getTable()
  {
    console.log(this.table.name)
  }

  deletePay(title: String, sal: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `delete from PAY where TITLE="${title}" and SAL="${sal}";`
    this.dataService.deleteField(db,query)
    this.bandDelete = true
  }

  deleteAsg(eno: String, pno: String, resp: String, dur: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `delete from ASG where ENO="${eno}" and PNO="${pno}" and RESP="${resp}" and DUR="${dur}";`
    this.dataService.deleteField(db,query)
    this.bandDelete = true
  }

  deleteProj(pno: String, pname: String, budget: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `delete from PROJ where pno="${pno}" and pname="${pname}" and budget="${budget}";`
    this.dataService.deleteField(db,query)
    this.bandDelete = true
  }

  deleteEmp(eno: String, ename: String, title: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `delete from EMP where eno="${eno}" and ename="${ename}" and title="${title}"`
    this.dataService.deleteField(db,query)
    this.bandDelete = true
  }

  InsertPay(title: String, sal: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `insert into PAY values("${title}",${sal});`
    this.dataService.postDato(db,query)
    this.bandInsert = true
  }

  InsertAsg(eno: String, pno: String, resp: String, dur: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `insert into ASG values("${eno}","${pno}","${resp}",${dur});`
    this.dataService.postDato(db,query)
    this.bandInsert = true
  }

  InsertProj(pno: String, pname: String, budget: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `insert into PROJ values("${pno}","${pname}",${budget});`
    this.dataService.postDato(db,query)
    this.bandInsert = true
  }

  InsertEmp(eno: String, ename: String, title: String)
  {
    let db = 0
    if(this.db.name == "Windows")
      db = 1
    else
      db = 2

    let query = `insert into EMP values("${eno}","${ename}","${title}");;`
    this.dataService.postDato(db,query)
    this.bandInsert = true
  }

  updateOne(title: String, sal: number)
  {
    this.bandUpdate = true
    this.title.nativeElement.value = title;
    this.sal.nativeElement.value = sal;
    this.titleold = title
    this.salold = sal
  }

  updateTwo(eno: String, pno: String, resp: String, dur: String)
  {
    this.bandUpdate = true
    this.eno.nativeElement.value = eno;
    this.pno.nativeElement.value = pno;
    this.resp.nativeElement.value = resp;
    this.dur.nativeElement.value = dur;
    this.enold = eno
    this.pnold = pno
    this.respold = resp
    this.durold = dur
  }

  updateThree(pno: String, pname: String, budget: Number)
  {
    this.bandUpdate = true
    this.pno.nativeElement.value = pno;
    this.pname.nativeElement.value = pname;
    this.budget.nativeElement.value = budget;
    this.pnold = pno;
    this.pnameold = pname;
    this.budgetold = budget;
  }

  updateFour(eno: String, ename: String, title: String)
  {
    this.bandUpdate = true
    this.eno.nativeElement.value = eno;
    this.ename.nativeElement.value = ename;
    this.title.nativeElement.value = title;
    this.enold = eno;
    this.enameold = ename;
    this.titleold = title;
  }

  cancelar(tabla: String)
  {

    this.bandUpdate = false
    this.bandInsert = false

    if(tabla == "PAY")
    {
      this.title.nativeElement.value = "";
      this.sal.nativeElement.value = "";
    }

    if(tabla == "ASG")
    {
      this.eno.nativeElement.value = "";
      this.pno.nativeElement.value = "";
      this.resp.nativeElement.value = "";
      this.dur.nativeElement.value = "";
    }

    if(tabla == "PROJ")
    {
      this.pno.nativeElement.value = "";
      this.pname.nativeElement.value = "";
      this.budget.nativeElement.value = "";
    }

    if(tabla == "EMP")
    {
      this.eno.nativeElement.value = "";
      this.ename.nativeElement.value = "";
      this.title.nativeElement.value = "";
    }

  }

  updatePay(titleN: String, salN: String)
  {
    if(this.bandUpdate)
    {
      let db = 0
      if(this.db.name == "Windows")
        db = 1
      else
        db = 2

      console.log(this.title.nativeElement.value,this.sal.nativeElement.value)
      let query = `update PAY set title="${titleN}", sal=${salN} where title="${this.titleold}" and sal = "${this.salold}";`
      this.dataService.updateDato(db,query)
      this.bandInsert = true
    }
    else
    {
      this.InsertPay(titleN,salN)
    }
  }

  updateAsg(enoN: String, pnoN: String, respN: String, durN: String)
  {
    if(this.bandUpdate)
    {
      let db = 0
      if(this.db.name == "Windows")
        db = 1
      else
        db = 2

      let query = `update ASG set eno="${enoN}",pno="${pnoN}",resp="${respN}", dur="${durN}" where eno="${this.enold}" and pno="${this.pnold}" and resp="${this.respold}" and dur="${this.durold}";`
      this.dataService.updateDato(db,query)
      this.bandInsert = true
    }
    else
    {
      this.InsertAsg(enoN,pnoN,respN,durN)
    }
  }

  updateProj(pnoN: String, pnameN: String, budgetN: String)
  {
    if(this.bandUpdate)
    {
      let db = 0
      if(this.db.name == "Windows")
        db = 1
      else
        db = 2

      let query = `update PROJ set pno="${pnoN}", pname="${pnameN}", budget="${budgetN}" where pno="${this.pnold}" and pname="${this.pnameold}" and budget="${this.budgetold}";`
      this.dataService.updateDato(db,query)
      this.bandInsert = true
    }
    else
    {
      this.InsertProj(pnoN,pnameN,budgetN)
    }
  }

  updateEmp(enoN: String, enameN: String, titleN: String)
  {
    if(this.bandUpdate)
    {
      let db = 0
      if(this.db.name == "Windows")
        db = 1
      else
        db = 2

      let query = `update EMP set eno="${enoN}", ename="${enameN}", title="${titleN}" where eno="${this.enold}" and ename="${this.enameold}" and title="${this.titleold}";`
      this.dataService.updateDato(db,query)
      this.bandInsert = true
    }
    else
    {
      this.InsertEmp(enoN,enameN,titleN)
    }
  }

}

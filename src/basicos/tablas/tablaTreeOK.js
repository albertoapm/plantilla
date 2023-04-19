import { useState, useEffect } from "react";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import nodes from './data5.json'
import nodes2 from './data4.json'
import { useTree } from '@table-library/react-table-library/tree';


export default function Inicio(param) {
    const key = 'Tree';
    //const theme = useTheme(getTheme());
    const THEME = {
      Table: `
      --data-table-library_grid-template-columns:  minmax(150px, 230px) 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
    `,
    BaseCell: `
      &:nth-of-type(1) {
        left: 0px;
      }
      &:nth-of-type(14) {
        right: 0px;
      }
    `,
      BaseRow: `
        font-size: 14px;
      `,
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-child(odd) {
          background-color: #d2e9fb;
        }
    
        &:nth-child(even) {
          background-color: #eaf5fd;
        }
      `,
    };

    const theme = useTheme(THEME);



    const [data, setData] = useState({ nodes });
    const [columns, setColumns] = useState([
        { label: 'Etiqueta', renderCell: (item) => item.Etiqueta, tree: true, pinLeft: true,  resize: true },
        { label: 'Ene', renderCell: (item) => item.Mes1,  resize: true },
        { label: 'Feb', renderCell: (item) => item.Mes2,  resize: true },
        { label: 'Mar', renderCell: (item) => item.Mes3,  resize: true },
        { label: 'Abr', renderCell: (item) => item.Mes4,  resize: true },
        { label: 'May', renderCell: (item) => item.Mes5,  resize: true },
        { label: 'Jun', renderCell: (item) => item.Mes6,  resize: true },
        { label: 'Jul', renderCell: (item) => item.Mes7,  resize: true },
        { label: 'Ago', renderCell: (item) => item.Mes8,  resize: true },
        { label: 'Set', renderCell: (item) => item.Mes9,  resize: true },
        { label: 'Oct', renderCell: (item) => item.Mes10,  resize: true },
        { label: 'Nov', renderCell: (item) => item.Mes11,  resize: true },
        { label: 'Dic', renderCell: (item) => item.Mes12,  resize: true },
        { label: 'Total', renderCell: (item) => item.Total, pinRight: true },
        { label: 'Hijos', renderCell: (item) => item.nodes?.length },
    
      ]);
    
  
    const [render, setRender] = useState(0);
    useEffect(() => {
      //CargarDatos();
      //alert(solicitante);
    }, [render]);
  
    useEffect(() => {
      setRender(0);
      console.log(data);
      console.log({nodes2});
      CargarDatos();
      //alert(solicitante);
    }, [param.fecha]);
  
    function DevolverFecha(texto) {
        return texto.substring(6,10) + '-' + texto.substring(3,5)+ '-' + texto.substring(0,2)
    }
    
    function DateToYYYYMMDD(valor){
     console.log(valor);
     var date = valor.getDate();
     var month = valor.getMonth() + 1; // take care of the month's number here ⚠️
     var year = valor.getFullYear();
     if (date < 10) {
       date = '0' + date;
     }
     
     if (month < 10) {
       month = '0' + month;
     }
    
     return (date + '/' + month + '/' + year)
    }



      function crearJSON(valores){
        console.log (valores.length);
        var n = valores.length;
        var i = 0;
        var ip = 0;
        var ip2 = 0;
        var Total = new Array();
        while (i < n) {
          var obj = new Object();
          obj.id = i;
          obj.Nivel = valores[i][0];
          obj.Det1 = valores[i][1];
          obj.Det2 = valores[i][2];
          obj.Det3 = valores[i][3];
          obj.Mes1 = valores[i][4];
          obj.Mes2 = valores[i][5];
          obj.Mes3 = valores[i][6];
          obj.Mes4 = valores[i][7];
          obj.Mes5 = valores[i][8];
          obj.Mes6 = valores[i][9];
          obj.Mes7 = valores[i][10];
          obj.Mes8 = valores[i][11];
          obj.Mes9 = valores[i][12];
          obj.Mes10 = valores[i][13];
          obj.Mes11 = valores[i][14];
          obj.Mes12 = valores[i][15];
          obj.Total = valores[i][16];
          if (valores[i][0] === '1'){
            obj.Etiqueta = valores[i][1];
            obj.nodes = new Array();
            Total.push(obj);
          }
          if (valores[i][0] === '2'){
            obj.Etiqueta = valores[i][2];
            obj.nodes = new Array();
            ip = Total.length - 1;
            Total[ip].nodes.push(obj);
          }
          if (valores[i][0] === '3'){
            obj.Etiqueta = valores[i][3];
            obj.nodes = new Array();
            ip = Total.length - 1;
            ip2 = Total[ip].nodes.length-1
            Total[ip].nodes[ip2].nodes.push(obj);
          }
            i+=1;
          }
      
          var jsonArray = JSON.parse(JSON.stringify(Total));
          return Total
      
      }

      function CargarDatos(){
        var data = new FormData();
        var xhr = new XMLHttpRequest();
        data.append('tipoCons', "1");
      
        xhr.open('POST', localStorage.getItem('path') + '/consultas/consultas.php', true);
      
        xhr.send(data);
        xhr.onload = function (e, n) {
            var txt=xhr.responseText;
            
            if (txt !== "0"){
                
                          
              //setData (txt);
                txt=JSON.parse(txt);
                const miArray = txt
                miArray.splice(0, 1);
                //console.log(miArray);
                setRender(1);

                var arrayNueva = {nodes: crearJSON(miArray)}
                    setData(arrayNueva);
                    console.log(arrayNueva);
            }else{
              console.log("Error")
            }
            
            }
      }


      const tree = useTree(data, {
        onChange: onTreeChange,
      });

      function onTreeChange(action, state) {
        console.log(action, state);
      }




    return (
     
      <div className="col-12  ">
         
          <CompactTable columns={columns} data={data} theme={theme}  tree={tree}  layout={{ custom: true, horizontalScroll: true }}/>
        
      
      </div>
     
    );




}
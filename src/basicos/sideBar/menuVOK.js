import { useState, useEffect, useRef } from "react";
import React from 'react'
import { useNavigate  } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';

const MenuItem = (o) => {

  useEffect(() => {
    if (!o.estado){
      setEstadoHijo(false);
    } 
  },);

  const [estadoHijo, setEstadoHijo] = useState(false);
  const navigate = useNavigate();
  const toggleDropDown = () => {
    
    if (estadoHijo==true){
      setEstadoHijo(false);
    }else{
      setEstadoHijo(true);
    }

    if (o.item.Link.substring(0,1) == '/' ){
      navigate(o.item.Link);
    }
    
  };

  function StyleCompleted(){

    return {
        fontSize: '14px',
        marginLeft : o.item.Nivel*20-10,
        maxHeight  : o.estado ?  '100px' :'0px',
        minHeight: o.estado ?  '25px' :'0px',
        Height  : o.estado ?  '25px' :'0px',
        marginBottom: o.estado ?  '5px' :'0px',
        opacity: o.estado ?  '1' : '0',
        visibility  : o.estado ?  'visible' :'hidden',
        transition: 'opacity 0.25s ease-in, max-height 0.25s ease-in',
        transition: 'all 0.25s ease-out',
        cursor: "pointer",
        color: "white",
        verticalAlign: "middle"
    }   
};

const Icono = () =>{

  if (o.item.nodes.length != 0){
    if (estadoHijo==true){
      return <KeyboardArrowDownIcon sx={{ color: "white" }}/>
    }else{
      return <KeyboardArrowRightIcon sx={{ color: "white"}}/>
    }
  }else{
    if ("con icono" == "sin icono"){
      return <LaunchIcon fontSize="small" sx={{ color: "white" , fontSize: 20}}/>;
    }else{
      return null
    }
    
  }
}

  return (
    <React.Fragment>
      <div key={"div" + o.index} style={StyleCompleted()}>
        <div key={"d2" + o.index} onClick = {toggleDropDown}> 
          <span  style ={{display:"inline-block", width: "25px"}}><Icono/></span> 
          <span style={{position: "absolute", marginTop: "3px"}}>{o.item.Etiqueta}</span>  </div>
      </div>  
        {o.item.nodes.map((item, i)=><MenuItem item={item} estado ={estadoHijo} key={i}/>)}
    </React.Fragment>
  );
};

const SearchItem = (p) => {


  const [updateFocus, setUpdateFocus] = useState(false);
  const [updateFocusID, setUpdateFocusID] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (updateFocus){
      var indice = updateFocusID
      if (indice > document.getElementsByClassName('example').length+1){
        indice = 1
      }
      if (indice == 0){
        indice = document.getElementsByClassName('example').length+1
      }
      if (document.getElementsByClassName('example').length==0){
        indice = 1
      }
      const nextfield = document.querySelector(`input[name=field-${indice}]`);
      nextfield.focus();
      //setUpdateFocus(false)
    }
  });

  const Opcion = (o) =>{
          return   (      
    <div>
      <input className="example" onKeyDown={handleKeyDown} onClick={(e)=>{navigate(e.target.dataset.value)}}
      name= {putName(o.item.Id)} tabIndex={o.item.Id} 
      style={{width: "200px", minHeight: "30px", position: "relative",
             marginTop: "-10px", cursor:"pointer", background: " #c8c8c8"}} 
      value={o.item.Etiqueta} data-value={o.item.Link} readOnly></input>
    </div>);
    
  };

  function putName(id){
    return 'field-'+id
  }

  function handleKeyDown(e){
    let fieldIntIndex = e.target.tabIndex;
    
    if (e.key === 'Enter') {
      //console.log(e.target.dataset.value);
      navigate(e.target.dataset.value);
    }
    if (e.key === 'ArrowDown'){
      e.preventDefault();
      setUpdateFocus(true)
      setUpdateFocusID(fieldIntIndex + 1)


    }
    if (e.key === 'ArrowUp'){
      e.preventDefault();
      setUpdateFocus(true)
      setUpdateFocusID(fieldIntIndex - 1)
    }

  }

  const [opciones, setOpciones] = useState([]);
  const [numOpc, setNumOpc] = useState(0);
  const handleSelect = (e) => {

  let txt = e.target.value.toUpperCase();
  if (txt==''){
    txt='XXXXXXXXXXXXX'
  }
  let enlaceFiltrados = p.enlaces.filter(enlace => enlace.Etiqueta.toUpperCase().includes(txt))

  let i = 0;
  let j = 10;
  if (j>enlaceFiltrados.length){
    j=enlaceFiltrados.length
  }
  setNumOpc(j);
  var enl = new Array();
  while (i < j){
    var e = new Object();
    e = enlaceFiltrados[i]
    e.Id = i+2;
    enl.push(e);
    i+=1
  }
  
    //console.log(enl);
    setOpciones(enl);
  };




  return (
    <React.Fragment>
      <div style={{marginBottom: "20px"}}>
        <input onKeyDown={handleKeyDown} name= 'field-1' tabIndex={1} style={{width: "200px", minHeight: "30px", position: "absolute", marginTop: "0px"}} onChange={(e)=>handleSelect(e)}></input>
        <span style={{position: "absolute", marginLeft: "205px"}}><SearchIcon sx={{ color: "white" , fontSize: 25, cursor: "pointer"}}/></span>
      </div>
      <div style={{position: "absolute", marginTop: "35px", width: "100%"}}>
          {opciones.map((item,i)=><Opcion item={item} key={i} />)}
          
      </div>
    </React.Fragment>
  );

};

function DropDownMenu() {

  const [data, setData] = useState( []);
  const [enlaces, setEnlaces] = useState([]);

  useEffect(() => {
    CargarDatos();
  }, []);


    function crearJSON(valores){
      //console.log(valores)
      var enl = new Array();
      var n = valores.length;
      var i = 0;
      var Total = new Array();
      while (i < n) {
        var obj = new Object();
        var e = new Object();
        obj.id = i;
        obj.Nivel = valores[i][0];
        obj.Etiqueta = valores[i][1];
        obj.Link = valores[i][2];
        obj.key = valores[i][3];
        obj.nodes = new Array();

        e.Etiqueta = valores[i][1];
        e.Link = valores[i][2];
        
        if (valores[i][0] == '1'){
          Total.push(obj);
        }else{
          var copy = Total[Total.length - 1]
          var i1 = 0;
          var j1 = valores[i][0]-2;
          while (i1 < j1){
            copy = copy.nodes[copy.nodes.length-1]
            i1+=1;
          }
          copy.nodes.push(obj);
        }

        if (e.Link.substring(0,1)=='/'){
          enl.push(e)
        }
      
          i+=1;
        }

        setEnlaces(enl);


        return Total
    
    }

    function CargarDatos(){ 
      var data = new FormData();
      var xhr = new XMLHttpRequest();
      data.append('tipoCons', "3");
    
      //xhr.open('POST', localStorage.getItem('path') + '/consultas/consultas.php', true);
      xhr.open('POST', localStorage.getItem('path') + '/consultas/consultas_server.php', true);
    
      xhr.send(data);
      xhr.onload = function (e, n) {
          var txt=xhr.responseText;
          
          if (txt !== "0"){
              txt=JSON.parse(txt);
              const miArray = txt
              miArray.splice(0, 1);
              var arrayNueva = {nodes: crearJSON(miArray)}
              setData(arrayNueva.nodes);

          }else{
            console.log("Error")
          }        
        }
    }



  return (
    <nav>

      <div style={{position: "absolute", marginTop: "50px", width: "100%"}}>
        <div style={{position: "inline-block", whiteSpace: "nowrap", overflow: "hidden", width: "100%"}}>
          {data.map((item,i)=><MenuItem item={item} estado ={true} key={i}/>)}
        </div>
      </div>
      <div style={{marginBottom: "20px"}}>
        <SearchItem enlaces={enlaces}/>
      </div>
      

        
      
        
    </nav>
  );
}

export default DropDownMenu;

  import * as React from 'react';

  import { CompactTable } from '@table-library/react-table-library/compact';
  import { useTheme } from '@table-library/react-table-library/theme';
  import { getTheme } from '@table-library/react-table-library/baseline';
  import nodes from './data.json'
  import { getValue } from '@testing-library/user-event/dist/utils';
  import { usePagination } from '@table-library/react-table-library/pagination';

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
  
  const key = 'Fixed Header';
 
  const Component = () => {
    const [data, setData] = React.useState({ nodes });
  
    const theme = useTheme({
      HeaderRow: `
        background-color: grey;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: OldLace;
        }
  
        &:nth-of-type(even) {
          background-color: PapayaWhip;
        }
      `,
    });

    const pagination = usePagination(data, {
      state: {
        page: 0,
        size: 100,
      },
      onChange: onPaginationChange,
    });
  
    function onPaginationChange(action, state) {
      console.log(action, state);
    }
  
    const handleUpdate = (value, id, property) => {
      setData((state) => ({
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === id) {
            return { ...node, [property]: value };
          } else {
            return node;
          }
        }),
      }));
    };

    const isOdd = (valor) =>(valor % 2  == 0) ? true : false
  
    const COLUMNS = [
      {
        label: 'Campo 1',
        renderCell: (item) => (
          <input
            type="text"
            style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0, backgroundColor: isOdd(item.id) ? "PapayaWhip": "OldLace" }}
            defaultValue={item.first_name}
            onBlur ={(event) => item.first_name === event.target.value ? console.log (item.first_name) : handleUpdate(event.target.value, item.id, 'first_name')}
          />
        ),
      },
      {
        label: 'Campo 2',
        renderCell: (item) => (
          <input
            type="date"
            style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0, backgroundColor: isOdd(item.id) ? "PapayaWhip": "OldLace" }}
            defaultValue={DevolverFecha(item.last_visited)}
            onBlur={(event) => DevolverFecha(item.last_visited) === event.target.value ? console.log (DevolverFecha(item.last_visited)) : handleUpdate(DateToYYYYMMDD(new Date(event.target.value)), item.id, 'last_visited')}
          />
          
        ),
      },
      {
        label: 'Campo 3',
        renderCell: (item) => (
          <select
          style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0, backgroundColor: isOdd(item.id) ? "PapayaWhip": "OldLace" }}
          defaultValue={item.gender}
          onBlur={(event) => item.gender === event.target.value ? console.log (item.gender) : handleUpdate(event.target.value, item.id, 'gender')}
        >
          <option value="NoGender">Sin</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
          
        ),
      },
      {
        label: 'Campo 4',
        renderCell: (item) => (
          <input
            type="checkbox"
            checked={item.is_complete}
            onBlur={(event) => handleUpdate(event.target.checked, item.id, 'is_complete')}
          />
        ),
      },
    ];
    return (
      <>
        <div
          style={{
            height: '400px',
          }}
        >
          <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ fixedHeader: true }} pagination={pagination}/>
        </div>

        <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

        <span>
          Page:{' '}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? 'bold' : 'normal',
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
  

      </>
    );
  };


export default function Inicio() {

    return (
      <div >
        <Component/>
      </div>
    );
  }

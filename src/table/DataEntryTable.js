import React, {useRef} from "react";

import { HotTable, HotColumn } from "@handsontable/react";
// import Handsontable from 'handsontable';

import { Tooltip } from 'react-tooltip'


import { registerAllModules } from 'handsontable/registry';
import getDataTypeProps from './function.js';

import "handsontable/dist/handsontable.min.css";
import 'handsontable/dist/handsontable.full.min.css';
import './handson.css'
// import 'views/admin/Tables/HandonsTable/handson_custom.css'

require('datejs');

registerAllModules()


var inData = require('./data.json');
var inSettings = require('./tableSettings.json');


const DataEntryTable = (props) => {
  console.log('rerender dataentrytable')
  const rowHeight = 23
  const hotRef = useRef(null);
  const data = inData[props.tableName]
  const tableSettings = inSettings[props.tableName]


  return (
    
    <>
    {data.length > 0 && 
    <HotTable
      ref={hotRef}
      comments={true}
      data={data}
      height={Math.min((data.length + 10 ) * rowHeight, 500)}
      colWidths={100}
      rowHeights={tableSettings['rowHeight'] || 23}
      viewportRowRenderingOffset={20}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      colHeaders={(col) => true}
      manualColumnResize={true}
      manualRowResize={false}
      manualRowMove={true}
      autoRowSize={false}
      licenseKey="non-commercial-and-evaluation"
      dropdownMenu={['filter_by_condition', 'filter_action_bar', '---------', 'filter_by_value', 'filter_operators', 'filter_by_condition2', '---------', 'clear_column']}


    >

      
      {tableSettings['columnName'].map((columnName, idx) => {
        if (data.length > 0 && !(columnName in data[0])) {} //if the dataset doesn't have this column, skip it; 
        else {
          var isViewable = tableSettings['isViewable'][columnName];
          const isEditable = tableSettings['isEditable'][columnName];
          const columnHeader = tableSettings['columnHeader'] && tableSettings['columnHeader'][columnName] || columnName
          var columnProps = {}

          // const dropdownSource = tableSettings['dropdownSource'] && tableSettings['dropdownSource'][columnName] && tableSettings['dropdownSource'][columnName]['dataField'] &&
          //   data[tableSettings['dropdownSource'][columnName]['dataField']][tableSettings['dropdownSource'][columnName]['column']]
          // console.log('dropdownSource', dropdownSource)
          const dataType = tableSettings['dataType'][columnName]
          
            const dataTypeProps = getDataTypeProps(dataType);
            columnProps = {...columnProps, ...dataTypeProps};
          if (dataType == 'date') {
            columnProps['type'] = 'date';
            columnProps['format'] = 'YYYY-MM-DD';
            columnProps['correctFormat'] = true;
          }

          if (dataType == 'boolean') {
            columnProps['type'] = 'checkbox'
          }

          if (dataType == 'html') {
            columnProps['renderer'] = 'html'
          }

        
          if (isViewable) {
         

            if (tableSettings['dataType'][columnName] == 'dropdown') {
              return <HotColumn data={columnName} title={columnHeader} 
                type='dropdown'
                // source={dropdownSource}
                source={['a', 'b', 'c']}
                >
              </HotColumn>
            }

            if (tableSettings['dataType'][columnName] == 'multi-dropdown' && true) {
              return <HotColumn data={columnName} title={columnHeader} {...columnProps} 
              disableVisualSelection={false}
              type='dropdown'
              source={['a', 'b', 'c', 'd','f']}

             >

              </HotColumn>
            }

            if (tableSettings['dataType'][columnName] == 'time') {
              columnProps['validator'] = 'time'
              columnProps['type'] = 'time' 
              columnProps['timeFormat'] = 'h:mm a'
              columnProps['correctFormat'] = true
              return <HotColumn data={columnName} title={columnHeader} {...columnProps} readOnly={!isEditable}>
              </HotColumn>  
            }
            
            return <HotColumn data={columnName} title={columnHeader} {...columnProps} readOnly={!isEditable}>
              </HotColumn>  
          } 
        }
      })}

    </HotTable>}

    <Tooltip multiline={true} className={'tooltip'} id={"header-tooltip"} />  
    </>
  );
  
};



export default DataEntryTable
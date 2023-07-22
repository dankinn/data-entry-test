
/**
 * The function returns the appropriate HandsonTable column
 * props for the input dataType.
 */
export default function getDataTypeProps (dataType) {
    var dataTypeProps = {}

    if (dataType == 'time') {
        dataTypeProps['type'] = 'time'
        dataTypeProps['timeFormat'] = 'h:mm a';
        dataTypeProps['correctFormat'] = true;
    }
    if (dataType == 'datetime') {
        dataTypeProps['type'] = 'date';
        dataTypeProps['dateFormat'] = 'MM/DD/YYYY';
        dataTypeProps['correctFormat'] = true;
    }
    if (dataType && dataType.substring(0,5) == 'float') {
        const numDecimals = parseInt(dataType.substring(5));
        dataTypeProps['type'] = 'numeric';
        var pattern = '0,0.'
        for (var i = 0; i < numDecimals; i++) {
            pattern += '0'
        }
        dataTypeProps['numericFormat'] = {pattern: pattern
        }
    }

    return dataTypeProps
}

const getDropdownPicklist = (data, columnName, tableName) => {
    /*
    tableData is the data for the specific dataField.
    Idx is the index of the dropDownSource field.
    data is the entire dataset
    */
    if (!data[tableName]['dropdownSource']) {
      return null
    }
  
    if (!data[tableName]['dropdownSource'][columnName]) {
      return null
    }
  
    const dropDownSource = data[tableName]['dropdownSource'][columnName];
    const dropdownTableName = dropDownSource['dataField']
    const dropdownColumnName = dropDownSource['column']
  
    const dropDownValues = [];

    for (var i = 0; i < data[dropdownTableName]['data'].length; i++) {
        var val
        val = data[dropdownTableName]['data'][i][dropdownColumnName];
        dropDownValues.push(val);
    }

    return dropDownValues;
  }


export function getDropdownProps (dropdownSource, data, columnName, tableName) {
    var dropdownProps = {}
    if (!dropdownSource) {} //do nothing if no dropdownSource
    else if (!dropdownSource.dataField) {}
    else {
        const dropdownPicklist = getDropdownPicklist(data, columnName, tableName);
        dropdownProps['type'] = 'dropdown';
        dropdownProps['source'] = dropdownPicklist;
    }

    return dropdownProps;
}
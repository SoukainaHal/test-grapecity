REQUEST_BODY=`input-files/heavy-table.json`

echo Generating XLSX...\\n
EXEC_TIME_XLSX_START=`date +%s%N | cut -b1-13`
curl -s --location POST localhost:3008/json2xlsx \
    --verbose \
    --data-raw "$REQUEST_BODY" > output-files/result.xlsx
EXEC_TIME_XLSX_END=`date +%s%N | cut -b1-13`

TOTAL_TIME_FOR_XLSX=$( echo "$EXEC_TIME_XLSX_END - $EXEC_TIME_XLSX_START" | bc -l )
echo "\\nTotal execution time for XLSX:" $TOTAL_TIME_FOR_XLSX ms\\n\\n

echo Generating PDF...\\n
EXEC_TIME_PDF_START=`date +%s%N | cut -b1-13`
curl -s --location POST localhost:3008/json2pdf \
    --verbose \
    --data-raw "$REQUEST_BODY" > output-files/result.pdf
EXEC_TIME_PDF_END=`date +%s%N | cut -b1-13`

TOTAL_TIME_FOR_PDF=$( echo "$EXEC_TIME_PDF_END - $EXEC_TIME_PDF_START" | bc -l )
echo "\\nTotal execution time for PDF:" $TOTAL_TIME_FOR_PDF ms\\n

for file in input-files/heavy-table.json

do 
  echo Generating XLSX...\\n
  EXEC_TIME_XLSX_START=`date +%s%N | cut -b1-13`
  curl -s POST --data @"$file" 'http://localhost:3008/json2xlsx' \
   --header 'Content-Type:application/json' \
   --verbose > output-files/result.xlsx
  EXEC_TIME_XLSX_END=`date +%s%N | cut -b1-13`

  TOTAL_TIME_FOR_XLSX=$( echo "$EXEC_TIME_XLSX_END - $EXEC_TIME_XLSX_START" | bc -l )
  echo "\\nTotal execution time for XLSX:" $TOTAL_TIME_FOR_XLSX ms\\n\\n

  echo Generating PDF...\\n
  EXEC_TIME_PDF_START=`date +%s%N | cut -b1-13`
  curl -s POST --data @"$file" 'http://localhost:3008/json2pdf' \
   --header 'Content-Type:application/json' \
   --verbose > output-files/result.pdf
  EXEC_TIME_PDF_END=`date +%s%N | cut -b1-13`

  TOTAL_TIME_FOR_PDF=$( echo "$EXEC_TIME_PDF_END - $EXEC_TIME_PDF_START" | bc -l )
echo "\\nTotal execution time for PDF:" $TOTAL_TIME_FOR_PDF ms\\n
done

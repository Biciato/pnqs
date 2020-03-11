import Vue from 'vue'
import numeral from 'numeral'
import moment from 'moment'

numeral.register('locale', 'pt', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'mil',
        million: 'milhões',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function () {
        return 'º';
    },
    currency: {
        symbol: 'R$'
    }
});
numeral.locale('pt');

Vue.filter('number', (value) => {
	return numeral(value).format('0,0.00')
})

Vue.filter('currency', (value) => {
	return (value > 0) ? numeral(value).format('$ 0,0.00') : "-"
})

Vue.filter('decimal', (value) => {
	return numeral(value).format('0,0')
})

Vue.filter('date', (value) => {
	if (value) {
		return moment(value).format('DD/MM/Y')
	}
	return ""
})

Vue.filter("cnpj", documentId => {
  documentId =
    typeof documentId != "string" ? documentId.toString() : documentId;
  documentId = documentId.padStart(14, "0");
  documentId = documentId.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
  return documentId;
});

	//Definindo a chamada do gr�fico (chart)
	google.load('visualization', '1.0', {'packages':['corechart']});
    google.setOnLoadCallback(drawChart);
	
	//Inicializando o processo de cria��o do gr�fico
    function drawChart() {
		
		//Criando o gr�fico com valores fixos atrav�s da vari�vel DATA
        var data = new google.visualization.DataTable();
            data.addColumn('string', 'Dias da Semana');
            data.addColumn('number', 'Produto 1');
            data.addColumn('number', 'Produto 2');
            data.addColumn('number', 'Produto 3');
            data.addColumn('number', 'Produto 4');
            data.addColumn('number', 'Meta de Vendas');
            data.addRows([
             ['Segunda-feira', 100, 85, 99, 66, 65],
             ['Ter�a-feira', 100, 78, 55, 72, 62],
             ['Quarta-feira', 100, 79, 85, 45, 88],
             ['Quinta-feira', 100, 69, 85, 42, 77],
             ['Sexta-feira', 100, 97, 93, 84, 74],
			 ['S�bado', 100, 77, 93, 94, 84],
			 ['Domingo', 100, 87, 85, 42, 74]
          ]);
     
		//Customizando o gr�fico atrav�s da vari�vel OPTIONS
        var options = {
            'legend': 'right',
            'title' : 'Venda de Produtos',
            'is3D'  : true,
            'width' : 900,
            'height': 500,
            seriesType: "bars",
            series: {4: {type: "line"}}
          };
             
        //Instanciando o gr�fico para ser visualizado na interface com o usu�rio - vari�vel CHART_DIV
		var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        
		//Executando um draw no gr�fico passando por par�metro os valores das vari�veis DATA e OPTIONS
		chart.draw(data, options);
      }
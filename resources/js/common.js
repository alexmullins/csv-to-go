$(function()
{
	var emptyInputMsg = "Paste CSV here";
	var emptyOutputMsg = "Go will appear here";
	var formattedEmptyInputMsg = '<span style="color: #777;">'+emptyInputMsg+'</span>';
	var formattedEmptyOutputMsg = '<span style="color: #777;">'+emptyOutputMsg+'</span>';

	// Hides placeholder text
	$('#input').on('focus', function()
	{
		var val = $(this).text();
		if (!val)
		{
			$(this).html(formattedEmptyInputMsg);
			$('#output').html(formattedEmptyOutputMsg);
		}
		else if (val == emptyInputMsg)
			$(this).html("");
	});

	// Shows placeholder text
	$('#input').on('blur', function()
	{
		var val = $(this).text();
		if (!val)
		{
			$(this).html(formattedEmptyInputMsg);
			$('#output').html(formattedEmptyOutputMsg);
		}
	}).blur();

	// Automatically do the conversion
	$('#input').keyup(function()
	{
		var input = $(this).text();
		if (!input)
		{
			$('#output').html(formattedEmptyOutputMsg);
			return;
		}

		var output = csvToGo(input);

		if (output.error)
			$('#output').html('<span class="clr-red">'+output.error+'</span>');
		else
		{
			var coloredOutput = hljs.highlight("go", output.go);
			$('#output').html(coloredOutput.value);
		}
	});

	// Highlights the output for the user
	$('#output').click(function()
	{
		if (document.selection)
		{
			var range = document.body.createTextRange();
			range.moveToElementText(this);
			range.select();
		}
		else if (window.getSelection)
		{
			var range = document.createRange();
			range.selectNode(this);
			window.getSelection().addRange(range);
		}
	});

	// Fill in sample JSON if the user wants to see an example
	$('#sample1').click(function()
	{
		$('#input').text(stringify(sampleJson1)).keyup();
	});
	$('#sample2').click(function()
	{
		$('#input').text(stringify(sampleJson2)).keyup();
	});
});

// Stringifies JSON in the preferred manner
function stringify(json)
{
	return JSON.stringify(json, null, "\t");
}
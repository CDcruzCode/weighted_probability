# weighted_probability
A simple class to randomly choose an item from an array of options that takes into account weighted probability for each item.

<h2>How to use:</h2>
To use this class, you will need to have your options in the form of an array. The class supports either seperate arrays for options and weights or the ability to use a 2 dimensional array that has the options as column 1 and weights as column 2.
<br>All weight values must be a integer. The total weighted values can add up to greater than 100 as the randomizer will pick any number between 0 and the total weighted probability values.
<br>If you set any weight value to <= 0 they will automatically be excluded from the options array.
<br>
  <h3>get( options_array: {ARRAY}, weights_array: {INT ARRAY} )</h3>
  Simply input the options as one array and weights as the second parameter. Make sure to only have integers in the weights array.<br>
  <br>
  let arr = ["a","b","c"];<br>
	let warr = [3,4,1];<br>
  new Weighted_Probability( arr, warr );<br>
  <h3>get_2d(2d_Array: { [ OPTION, INT_WEIGHT ] } )</h3>
  When using the 2D array option, all the values and weights are a part of the same array as shown below.<br>
  <br>
  let ddarr = [<br>
			["test",100],<br>
			["another one", 30],<br>
			["a new option", 10]<br>
		]<br>
   new Weighted_Probability( ddarr );

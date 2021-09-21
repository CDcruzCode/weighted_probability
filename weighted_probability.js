class Weighted_Probability {

  static #rand_int(min=0, max=10) {
    return Math.floor((Math.random() * max) + min);
  }

  static #is_array_valid(array) {
    for (var i = 0; i < array.length; i++) {
      if(!Number.isInteger(array[i])) {
        throw new Error("Weights array can only contain integers.");
      }
    }
    return true;
  }

  static #is_2d_array_valid(array) {
    for (var i = 0; i < array.length; i++) {
      if(array[i].constructor !== Array) {
        throw new Error("All array items must be a 2D array following the format '[option, int_probability_weight]'.");
      } else if(array[i][1] == undefined) {
        throw new Error("The second column of the array cannot be undefined.");
      } else if(!Number.isInteger(array[i][1]) ) {
        throw new Error("The weights column must strictly use integers.");
      }
    }
    return true;
  }

  get_2d(dd_array) {
    if(Weighted_Probability.#is_2d_array_valid(dd_array)) {
      let array_clone = JSON.parse(JSON.stringify(dd_array));
      let total_probability = 0;


      for(let i = 0; i < array_clone.length; i++) {
        //Remove any options that have a probability of 0 or below.
        if(array_clone[i][1]  <= 0) {
          array_clone.splice(i, 1);
          i--;
        } else {
          total_probability += array_clone[i][1];
        }
      }

      let chosen_option_int = Weighted_Probability.#rand_int(0, total_probability);
      let cumulative_probability = 0;

      for(let a = 0; a < array_clone.length; a++) {
        cumulative_probability += array_clone[a][1];
        array_clone[a][1] = cumulative_probability;

        if(array_clone[a][1] > chosen_option_int) {
            return array_clone[a][0];
        } else if (chosen_option_int <= array_clone[array_clone.length -1][1]) {
            return array_clone[array_clone.length -1][0];
        }
      }
    }
    throw new Error("[Weighted_Probability] get_2d() Error unknown");
  }

  get(options, weights) {
    if(Weighted_Probability.#is_array_valid(weights)){
      //Input an array of options and corresponding weights
    	//and output a random option taking into account the weights of each option.
      let options_clone = [...options];
      let weights_clone = [...weights];
      if(options_clone.length != weights_clone.length) {
        throw new Error("options_clone array and weights_clone array must be of equal lengths");
      }

    	let total_probability = 0;

    	for(let i = 0; i < weights_clone.length; i++) {
        //Remove any options that have a probability of 0 or below.
        if(weights_clone[i]  <= 0) {
          weights_clone.splice(i, 1);
          options_clone.splice(i, 1);
          i--;
        } else {
          total_probability += weights_clone[i];
        }
    	}

    	let chosen_option_int = Weighted_Probability.#rand_int(0, total_probability);
    	let cumulative_probability = 0;

    	for(let a = 0; a < weights_clone.length; a++) {
    	  cumulative_probability += weights_clone[a];
    	  weights_clone[a]= cumulative_probability;

    	  if(weights_clone[a] > chosen_option_int) {
    		    return options_clone[a];
    	  } else if (chosen_option_int <= weights_clone[weights_clone.length -1]) {
    		    return options_clone[options_clone.length -1];
    	  }
    	}
    }

	   throw new Error("[Weighted_Probability] get() Error unknown");
  }

}

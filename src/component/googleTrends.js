import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';

function GoogleTrends({ id, googleTrendUrl }) {

	const myspace = window.document.createElement('div')

	myspace.innerHTML = googleTrendUrl;



	const [first, , last] = myspace.childNodes;
	const lastText = 'window.'.concat(last.childNodes[0].textContent.trim());
	const loader = first.src;

	const runningScript = `${lastText.slice(0, 39)}To( document.getElementById('${id}'), ${lastText.slice(40)} `


	return (
		<div>
			<Helmet>
				<script type="text/javascript" defer src={loader}></script>

				<script type="text/javascript" defer>
					{` setTimeout(() =>{
					
							document.getElementById('${id}').innerHTML = ""
					
							 ${runningScript}
					 
					 }, 1000); `}
				</script>
			</Helmet>
			<div id={`${id}`}>  </div>
		</div >
	);
}


GoogleTrends.propTypes = {
	id: PropTypes.string.isRequired,
	googleTrendUrl: PropTypes.string.isRequired,
};

export default GoogleTrends;
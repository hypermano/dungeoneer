var React = require("react");

const TextEditor = ({extra, onExtraChange}) => {
	var callback = (proxy) => onExtraChange(proxy.target.value, true);
	return (
		<div>
			<div>Some text</div>
			<textarea value={extra} onChange={callback}/>
		</div>
	);
};

TextEditor.propTypes = {
	extra: React.PropTypes.string,
	onExtraChange: React.PropTypes.func
};

module.exports = TextEditor;
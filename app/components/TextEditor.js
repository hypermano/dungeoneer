var React = require("react");

const TextEditor = ({extra, onComponentChange}) => {
	var callback = (proxy) => {
		var ctx = {
			source: "text",
			text: proxy.target.value
		};
		onComponentChange(ctx);
	};
	return (
		<div>
			<div>Some text</div>
			<textarea value={extra} onChange={callback}/>
		</div>
	);
};

TextEditor.propTypes = {
	extra: React.PropTypes.string,
	onComponentChange: React.PropTypes.func
};

module.exports = TextEditor;
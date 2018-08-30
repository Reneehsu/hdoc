import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
};
const font = ['12', '24', '36', '48'];
font.forEach((ft) => { styleMap[ft] = { fontSize: `${ft}px` }; });
const color = ['red', 'blue', 'green', 'black'];
color.forEach((cr) => { styleMap[cr] = { color: cr }; });

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'CENTERALIGN') {
    return 'CENTERALIGN';
  } else if (type === 'LEFTALIGN') {
    return 'LEFTALIGN';
  } else if (type === 'RIGHTALIGN') {
    return 'RIGHTALIGN';
  }
  return null;
}

class _Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), colorDrop: false, fontDrop: false };
    this.onChange = editorState => this.setState({ editorState });
  }
  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD',
    ));
  }
  onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'ITALIC',
    ));
  }
  onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'UNDERLINE',
    ));
  }
  onAlignClick(alignInput) {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      alignInput,
    ));
  }
  onFontClick(fontInput) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      fontInput,
    ));
  }
  onColorClick(colorInput) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      colorInput,
    ));
  }
  onBulletListClick() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'unordered-list-item',
    ));
  }
  onNumberedListClick() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item',
    ));
  }
  toggleColorOpen() { this.setState({ colorDrop: !this.state.colorDrop }); }
  toggleFontOpen() { this.setState({ fontDrop: !this.state.fontDrop }); }
  logout(){
    fetch('http://127.0.0.1:1337/logout', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        this.props.setUser(null);
        this.props.changePage('Login')
      } else {
        console.log(responseJson);
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
  }
  render() {
    const colorMenu = `dropdown-menu${this.state.colorDrop ? ' show' : ''}`;
    const fontMenu = `dropdown-menu${this.state.fontDrop ? ' show' : ''}`;
    return (
      <div id="content" style={{ margin: '20px' }}>
        {/* <h1 style={{ backgroundColor: 'blue' }}>Horizons Doc</h1> */}
        <button className="btn btn-secondary margin" onClick={() => (this.onBoldClick())}>
          <i className="fas fa-bold" />
        </button>
        <button className="btn btn-secondary margin" onClick={() => (this.onItalicClick())}>
          <i className="fas fa-italic" />
        </button>
        <button className="btn btn-secondary margin" onClick={() => (this.onUnderlineClick())}>
          <i className="fas fa-underline" />
        </button>
        <button className="btn btn-secondary margin" onClick={() => (this.onAlignClick('LEFTALIGN'))}>
          <i className="fas fa-align-left" />
        </button>
        <button className="btn btn-secondary margin" onClick={() => (this.onAlignClick('CENTERALIGN'))}>
          <i className="fas fa-align-center" />
        </button>
        <button className="btn btn-secondary margin" onClick={() => (this.onAlignClick('RIGHTALIGN'))}>
          <i className="fas fa-align-right" />
        </button>
        <button className="btn btn-secondary margin" onClick={() => (this.onBulletListClick())}>
          <i className="fas fa-list-ul" />
        </button>
        <button className="btn btn-secondary margin" onClick={() => (this.onNumberedListClick())}>
          <i className="fas fa-list-ol" />
        </button>
        <div className="dropdown margin" style={{ display: 'inline-block' }} onClick={() => this.toggleFontOpen()}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-font" />
          </button>
          <div className={fontMenu} aria-labelledby="dropdownMenuButton">
            {font.map(ft => <a key={ft} className="dropdown-item" onClick={() => (this.onFontClick(ft))}>{ft}</a>)}
          </div>
        </div>
        <div className="dropdown margin" style={{ display: 'inline-block' }} onClick={() => this.toggleColorOpen()}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-palette" />
          </button>
          <div className={colorMenu} aria-labelledby="dropdownMenuButton">
            {color.map(cr => <a key={cr} className="dropdown-item" onClick={() => (this.onFontClick(cr))}>{cr}</a>)}
          </div>
        </div>
        <button className="btn btn-secondary margin" style={{float:'right'}} onClick={() => (this.logout())}>Log out</button>
        <div style={{
          border: '2px solid grey',
          padding: '6px',
          marginTop: '10px',
          height: '700px',
          backgroundColor: 'white',
        }}
        >
          <Editor
            customStyleMap={styleMap}
            blockStyleFn={myBlockStyleFn}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default _Document;

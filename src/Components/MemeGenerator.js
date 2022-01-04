import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();

    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ allMemeImgs: response.data.memes });
      });
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitHandler(event) {
    event.preventDefault();

    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const memeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: memeImg });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.changeHandler}
          />

          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.changeHandler}
          />

          <button>Generate Meme</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="Meme" />

          <h2 className="top-text">{this.state.topText}</h2>
          <h2 className="bottom-text">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;

import React from "react";

class MemeGenerator extends React.Component {
  // Set initial states and bind the methods
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

  // Call API and update the state when the MemeGenerator component Mounts
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ allMemeImgs: response.data.memes });
      });
  }

  // Set the states 'topText' & 'bottomText' on change of inputs
  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // On form submit, select a random image from the array and update the state of 'randImg'
  submitHandler(event) {
    event.preventDefault();

    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const memeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: memeImg });
  }

  render() {
    return (
      <div className="meme-gen">
        {/* Take inputs */}
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

        {/* Display the meme */}
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

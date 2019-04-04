import React, { Component } from 'react';
import Gallery from "react-photo-gallery";

class Collage extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    }
    this.columns = this.columns.bind(this);
  }

  columns(containerWidth) {
    let columns = 2;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  }

  render() {
    const { pictures } = this.props;

    const imagens = pictures.map((item) => {
      if (item.naturalWidth == item.naturalHeight) {
        return {
          alt: item.alt,
          src: item.src,
          width: 1,
          height: 1
        }
      } else if (item.naturalWidth > item.naturalHeight) {
        return {
          alt: item.alt,
          src: item.src,
          width: 4,
          height: 3
        }
      } else {
        return {
          alt: item.alt,
          src: item.src,
          width: 3,
          height: 4
        }
      }
    });

    return (
      <Gallery photos={imagens} columns={this.columns} />
    )
  }
}

export default Collage;
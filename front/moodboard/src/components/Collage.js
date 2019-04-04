import React, { Component } from 'react';
import Gallery from "react-photo-gallery";

import axios from 'axios';

class Collage extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    }
    this.columns = this.columns.bind(this);
  }

  // componentDidMount() {
  //   axios.get('http://localhost:8080/api/pictures/')
  //     .then((response) => {
  //       const pictures = response.data;
  //       this.setState({ pictures });
  //     })
  //     .catch(err => console.log(err));
  // }

  columns(containerWidth) {
    let columns = 2;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  }

  render() {

    // const photos = [
    //   {
    //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    //     width: 4,
    //     height: 3,
    //   },
    //   {
    //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    //     width: 1,
    //     height: 1
    //   },
    //   {
    //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    //     width: 3,
    //     height: 4
    //   },
    //   {
    //     src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    //     width: 3,
    //     height: 4
    //   },
    //   {
    //     src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    //     width: 3,
    //     height: 4
    //   },
    //   {
    //     src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    //     width: 4,
    //     height: 3
    //   },
    //   {
    //     src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    //     width: 3,
    //     height: 4
    //   },
    //   {
    //     src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    //     width: 4,
    //     height: 3
    //   },
    //   {
    //     src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    //     width: 4,
    //     height: 3
    //   }
    // ];
    
    
    const { pictures } = this.props;
    console.log(pictures);
    

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

    // console.log(imagens);
    
    // return (
    //   //  <Gallery photos={photos} />
    //   <Gallery photos={photos} columns={columns} />

    return (
      <Gallery photos={imagens} columns={this.columns} />
    )
  }
}

export default Collage;
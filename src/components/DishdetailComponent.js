import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


export default class DishDetail extends Component {
  constructor(props) {
    super(props)
  }

  renderDish(dish) {
    if(dish) {
      return(
         <Card>
          <CardImg width='100%' src={dish.image} alt={dish.name}></CardImg>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return(
        <div></div>
      );
    }
  }

  renderComments(comments) {
    if(comments) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className='list-unstyled'>
          {
            comments.map(comment => {
              let formattedDate = new Date(comment.date).toDateString();
              return (
                <li>
                  <p>{comment.comment}</p>
                  <p>--{comment.author}, {formattedDate}</p>
                </li>
              );
            })
          }
          </ul>
        </div>
      );
    } else {
      return <div></div>
    }
  }

  render() {
    const { dish } = this.props;
    return (
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>{this.renderDish(dish)}</div>
        <div className='col-12 col-md-5 m-1'>{this.renderComments(dish ? dish.comments : null)}</div>
      </div>
    )
  }
}

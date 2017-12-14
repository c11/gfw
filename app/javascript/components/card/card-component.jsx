import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button-regular';
import Dotdotdot from 'react-dotdotdot';

import './card-styles.scss';

class Card extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { data, readMoreText, className } = this.props;
    const onClick = this.props.onClick || false;
    return (
      <div
        className={`c-about-impacts-item ${className} ${
          data.image ? '' : '-no-image'
        }`}
      >
        {data.image && (
          <div
            className={`c-about-impacts-item__image ${
              onClick ? '-action' : ''
            }`}
            style={{ backgroundImage: `url(${data.image})` }}
            onClick={() => onClick && onClick(data)}
            role="button"
            tabIndex={0}
          >
            <span>{data.image_credit}</span>
          </div>
        )}
        {data.title && (
          <div className="c-about-impacts-item__header">
            <h3 className="text -title-m -color-2 -light">{data.title}</h3>
          </div>
        )}
        <div className="c-about-impacts-item__paragraph text -paragraph-7 -color-2">
          <Dotdotdot clamp={4}>{data.outcome}</Dotdotdot>
        </div>
        <div className="c-about-impacts-item__footer">
          {data.legend && (
            <p className="text -paragraph-5 -color-2-o ">{data.legend}</p>
          )}
          {data.link ? (
            <Button link={data.link} blank text={readMoreText} />
          ) : null}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    image_credit: PropTypes.string,
    title: PropTypes.string,
    outcome: PropTypes.string,
    link: PropTypes.string,
    legend: PropTypes.string
  }),
  className: PropTypes.string,
  onClick: PropTypes.func,
  readMoreText: PropTypes.string.isRequired
};

Card.defaultProps = {
  readMoreText: 'READ MORE'
};

export default Card;
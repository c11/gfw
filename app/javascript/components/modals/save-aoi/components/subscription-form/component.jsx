import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import remove from 'lodash/remove';
import { getLanguages } from 'utils/lang';
import cx from 'classnames';

import Dropdown from 'components/ui/dropdown';
import Loader from 'components/ui/loader';
import Button from 'components/ui/button';
import InputTags from 'components/input-tags';

import './styles.scss';

class SubscriptionForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
      name: props.locationName,
      tags: [],
      email: props.email,
      emailError: false,
      nameError: false
    };
  }

  componentDidMount() {
    const { activeMapDatasets, setSaveAOISettings } = this.props;
    if (activeMapDatasets && activeMapDatasets.length) {
      setSaveAOISettings({ datasets: activeMapDatasets });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeMapDatasets, setSaveAOISettings } = this.props;

    if (!isEqual(this.state, prevState)) {
      setSaveAOISettings({ ...this.state });
    }

    if (
      activeMapDatasets &&
      activeMapDatasets.length &&
      !isEqual(activeMapDatasets, prevProps.activeMapDatasets)
    ) {
      setSaveAOISettings({ datasets: activeMapDatasets });
    }
  }

  onToggleLayer = dataset => {
    const { activeDatasets, setSaveAOISettings } = this.props;
    const shoudlRemove = activeDatasets.includes(dataset);
    setSaveAOISettings({
      datasets: shoudlRemove
        ? remove(activeDatasets, d => d !== dataset)
        : [...activeDatasets, dataset]
    });
  };

  validateEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render() {
    const {
      // datasets,
      activeDatasets,
      // setModalMetaSettings,
      saveSubscription,
      userData,
      saving,
      error,
      location
    } = this.props;
    const { lang, name, email, emailError, nameError } = this.state;
    const canSubmit =
      activeDatasets &&
      activeDatasets.length &&
      this.validateEmail(email) &&
      name &&
      lang;

    return (
      <div className="c-form c-subscription-form">
        <div className={cx('field', { error: nameError })}>
          <span>Name this area for later reference</span>
          <input
            value={name}
            onChange={e =>
              this.setState({
                name: e.target.value,
                nameError: !e.target.value
              })
            }
          />
        </div>
        <div className={cx('field', { error: nameError })}>
          <span>Assign tags to organize and group areas</span>
          <InputTags />
        </div>
        <div className={cx('field', { error: emailError })}>
          <span>Email*</span>
          <input
            value={email}
            onChange={e =>
              this.setState({
                email: e.target.value,
                emailError: !this.validateEmail(e.target.value)
              })
            }
          />
        </div>
        <div className="field">
          <span>Language*</span>
          <Dropdown
            theme="theme-dropdown-native-form"
            options={getLanguages()}
            value={lang}
            onChange={newLang => this.setState({ lang: newLang })}
            native
          />
        </div>
        <div className="save-subscription">
          {error ? (
            <p className="error-message">
              This service is currently unavailable. Please try again later.
            </p>
          ) : (
            <p>You can always change these settings in MyGFW</p>
          )}
          <Button
            className={cx('submit-btn', { error }, { saving })}
            onClick={() =>
              saveSubscription({
                ...this.state,
                datasets: activeDatasets,
                userData,
                ...location
              })
            }
            disabled={!canSubmit}
          >
            {saving ? <Loader className="saving-btn-loader" /> : 'SAVE'}
          </Button>
        </div>
      </div>
    );
  }
}

SubscriptionForm.propTypes = {
  setSaveAOISettings: PropTypes.func,
  saveSubscription: PropTypes.func,
  userData: PropTypes.object,
  activeDatasets: PropTypes.array,
  lang: PropTypes.string,
  locationName: PropTypes.string,
  email: PropTypes.string,
  error: PropTypes.bool,
  saving: PropTypes.bool,
  location: PropTypes.object,
  activeMapDatasets: PropTypes.array
};

export default SubscriptionForm;

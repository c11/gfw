class BrowserSupportController < ApplicationController
  skip_before_action :check_browser

  layout 'application_react'
end

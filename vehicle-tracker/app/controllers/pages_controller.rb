class PagesController < ApplicationController
  def index
    if user_signed_in?
      render 'dashboard'
    end
  end

  def dashboard
  end
end

class CarsController < ApplicationController
  def index
  end

  def new
    @car = Car.create
  end
end

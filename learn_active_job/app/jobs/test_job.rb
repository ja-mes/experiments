class TestJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Person.create(name: Faker::Name.name)
  end
end

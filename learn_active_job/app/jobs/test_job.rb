class TestJob
  @queue = :file_serve

  def self.perform
    Person.create(name: Faker::Name.name)
  end
end

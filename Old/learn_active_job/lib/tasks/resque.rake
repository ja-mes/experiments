require 'resque/tasks'
require 'resque/scheduler/tasks'

task 'resque:setup' => :environment
Resque.schedule = YAML.load_file(File.join(Rails.root, 'config', 'resque_schedule.yml'))

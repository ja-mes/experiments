module ApplicationHelper
  def isActive(controller, action = nil)
    if action == nil
      if params[:controller] == controller
        'active'
      end
    else
      if params[:controller] == controller && params[:action] == action
        'active'
      end
    end
  end
end

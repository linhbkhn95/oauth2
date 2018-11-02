module.exports = function(req, res, next) {
    res.locals.messages = { success: [], error: [], warning: [] };
  
    if(!req.session.messages) {
      req.session.messages = { success: [], error: [], warning: [] };
      return next();
    }
    res.locals.messages = _.clone(req.session.messages);
  
    // Clear flash
    req.session.messages = { success: [], error: [], warning: [] };
    return next();
  };
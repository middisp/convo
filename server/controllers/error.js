exports.get404 = (req, res, next) => {
  res.staus(404).render('404');
}
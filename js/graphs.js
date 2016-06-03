// git graphs - expects reveal to be loaded first!

Reveal.addEventListener('ready', function () {
  var perfectWorld = new GitGraph({
    elementId: 'gg-perfect-world',
    author: 'James Kruth'
  });
  perfectWorld
    .branch('master')
    .commit({ message: 'Working on v1.0.0'  })
    .commit({ message: 'Release v1.0.0', tag: 'v1.0.0'})
    .commit({ message: 'Working on v1.1.0' })
    .commit({ message: 'Release v1.1.0', tag: 'v1.1.0'})
    .commit({ message: 'Working on v1.2.0' });

  var notPerfect1 = new GitGraph({
    elementId: 'gg-not-perfect-1',
    author: 'James Kruth'
  });
  var np1Master = notPerfect1.branch('master');
  np1Master
    .commit({ message: 'Working on v1.0.0'  })
    .commit({ message: 'Release v1.0.0', tag: 'v1.0.0'})
    .commit({ message: 'Working on v1.1.0' })
    .commit({ message: 'Release v1.1.0', tag: 'v1.1.0'});
  var np1Maint = np1Master.branch({ name: 'v1.1-maint' });
  np1Maint
    .commit({ message: 'Working on v1.1.1' })
    .commit({ message: 'Release v1.1.1', tag: 'v1.1.1'});
  np1Master.checkout();
  np1Master.commit({ message: 'Working on v1.2.0' });

  var notPerfect2 = new GitGraph({
    elementId: 'gg-not-perfect-2',
    author: 'James Kruth'
  });
  var np2Master = notPerfect2.branch('master');
  np2Master
    .commit({ message: 'Working on v1.1.0' })
    .commit({ message: 'Release v1.1.0', tag: 'v1.1.0'});
  var np2Maint = np2Master.branch({ name: 'v1.1-maint' });
  np2Maint
    .commit({ message: 'Working on v1.1.1' })
    .commit({ message: 'Release v1.1.1', tag: 'v1.1.1'});
  np2Master.checkout();
  np2Master.commit({ message: 'Working on v1.2.0' });
  np2Maint.merge(np2Master);
  np2Master.commit({ message: 'Release v1.2.0', tag: 'v1.2.0' });
});
